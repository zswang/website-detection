website-detection
--------
The detection website introduces third party components

## Install

```shell
npm install
```

## Environment dependence

### phantomjs

* [phantomjs](https://phantomjs.org)

```shell
mkdir ~/software
cd ~/software
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -O phantomjs-2.1.1-linux-x86_64.tar.bz2
tar -xvf phantomjs-2.1.1-linux-x86_64.tar.bz2
mv phantomjs-2.1.1-linux-x86_64 /usr/local/phantomjs
ln -s /usr/local/phantomjs/bin/phantomjs /usr/bin/phantomjs
phantomjs -v
```

### phantomjs of centos

```shell
yum install libXext libXrender fontconfig libfontconfig.so.1
```

## Start

```shell
pm2 start pm2.json
```