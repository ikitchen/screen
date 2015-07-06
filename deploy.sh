#!/bin/bash

echo "Creating remote directory: $SERVER:$REMOTE_FOLDER";
ssh -p $PORT $SERVER "
  mkdir -p $REMOTE_FOLDER
";
echo "Copying archive";
scp -P $PORT $LOCAL_PACKAGE $SERVER:$REMOTE_FOLDER

echo "Unpacking archive on remote server";
ssh -p $PORT $SERVER "
  cd $REMOTE_FOLDER
  tar xzf $PACKAGE_NAME
  echo \"Current npm installation:\"
  npm ls --depth=0
  echo \"Rebuilding binary modules:\"
  npm build ./node_modules/ikitchen-mcp23017/node_modules/i2c/
";
