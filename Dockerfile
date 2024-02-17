FROM nginx:latest

EXPOSE 80

ADD nginx.conf /etc/nginx/conf.d/default.conf
ADD static /var/www/html
