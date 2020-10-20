"use strict";
const amqp = require('amqplib');
const format = require('string-format');
format.extend(String.prototype);

const env = require('../env');
const consumers = require('./consumer');

const RABBITMQ_HOST = "amqp://{0}:{1}@{2}:{3}"
    .format(env.RABBIT_MQ.USER, env.RABBIT_MQ.PASSWORD, env.RABBIT_MQ.HOST, env.RABBIT_MQ.PORT);

let RABBITMQ_CONN = null;
let PUBLISH_CHANNEL = null;

exports.pushToQueue = (queue, data) => {
    if (!RABBITMQ_CONN || typeof(RABBITMQ_CONN) == "undefined") {
        connect(function () {
            push(queue, data);
        });
        return;
    }
    push(queue, data);
}

function push(queue, data) {
    PUBLISH_CHANNEL.assertQueue(queue).then(function (ok) {
        PUBLISH_CHANNEL.sendToQueue(queue, Buffer.from(data));
    })
}

/**
 * `onMessage` Creates a channel to consume from a queue and is invoked when a message found
 *
 * @param connection connection reference to rabbit mq
 * @param queue queue to listen to.
 * @param prefetch number of messages to be consumed at a time
 * @param onIncomingMessage callback if a message is found
 * @returns {PromiseLike<T> | Promise<T>}
 */
function onMessage(connection, queue, prefetch, onIncomingMessage) {
    return connection.createChannel().then(function (channel) {
        channel.recover();
        channel.prefetch(prefetch);
        return channel.assertQueue(queue).then(function (ok) {
            return channel.consume(queue, function (message) {
                if (message != null) {
                    onIncomingMessage(message.content.toString(), function (isSuccessful) {
                        if (isSuccessful) {
                            channel.ack(message);
                        } else {
                            channel.nack(message);
                        }
                    });
                }
            }, {noAck: false});
        })
    })
}

/**
 * `startQueueConsumers` Starts consumers listed in consumer and binds it to function
 * @param connection -> amqp connection
 */
function startQueueConsumers(connection) {
    for (let consumersKey in consumers) {
        let queueName = consumersKey;
        let prefetch = consumers[queueName].prefetch || 1;
        let onIncomingMessageCallback = consumers[queueName].bindFunction;

        onMessage(connection, queueName, prefetch, onIncomingMessageCallback);
    }
}

/**
 * `start` Creates a connection to rabbit mq and starts consumers.
 */
let connect = function (callback) {
    amqp.connect(RABBITMQ_HOST).then(function (conn) {
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error " + err.message);
            }
        });

        conn.on("close", function () {
            console.error("[AMQP] reconnecting");
            return setTimeout(() => connect(callback), 1000);
        });
        console.log("[AMQP] connected");
        startQueueConsumers(conn)
        RABBITMQ_CONN = conn;
        RABBITMQ_CONN.createChannel().then(function (channel) {
            PUBLISH_CHANNEL = channel;
            if (callback) {
                callback();
            }
        });
    })
}

exports.connect = connect;