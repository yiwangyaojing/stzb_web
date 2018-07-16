# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
# node 的镜像从阿里云获取
FROM registry.cn-hangzhou.aliyuncs.com/aliyun-node/alinode:3.11.0-alpine
# 设置作者
MAINTAINER Golfen Guo <golfen.guo@daocloud.io>

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server
# 拷贝当前文件内所有的文件到 docker 镜像app 目录下,也就是把当前的项目放到 docker 容器内
COPY . /app
# 以docker 下的app 目录为默认的运行系统命令所在的目录,也就是说 下面的 run 和 CMD 命令都是在 app 目录下运行,也就是在项目目录下运行
WORKDIR /app
# 在app 目录下安装依赖项
RUN npm install --registry=https://registry.npm.taobao.org
# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
# 开放容器端口(此端口应该是项目的端口) 让外部可以进入
EXPOSE 8083

# The CMD instruction provides default execution command for an container
# Start Nginx and keep it from running background
# docker 镜像成功后,所执行的命令,一般是项目的运行命令
CMD npm run dev