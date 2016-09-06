#!/bin/sh

# provision elasticsearch user
addgroup sudo
adduser -D -g '' elasticsearch
adduser elasticsearch sudo
chown -R elasticsearch /elasticsearch /data
echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# allow for memlock
ulimit -l unlimited
sleep 20
hosts=$(node /usr/local/bin/bootstrap.js $MARATHON_URL $APP_ID)
node_name="${APP_ID}-${PORT0}"
# run
sudo -E -u elasticsearch /elasticsearch/bin/elasticsearch --node.name=${node_name} \
--discovery.zen.ping.multicast.enabled=false \
--discovery.zen.ping.unicast.hosts=${hosts} \
--discovery.zen.ping_timeout=30s \
--discovery.zen.join_timeout=300s \
--discovery.zen.publish_timeout=300s \
--http.port=9200 \
--transport.tcp.port=${PORT1} \
--transport.publish_port=${PORT1}
