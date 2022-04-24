FROM node:17-buster-slim
ENV HOME=/home/node/app NODE_ENV=production NODE_PORT=3000 ENTRYPOINT_FILE="index.js"
WORKDIR $HOME
USER node
COPY --chown=node:node ./app .
EXPOSE $NODE_PORT
CMD node $ENTRYPOINT_FILE