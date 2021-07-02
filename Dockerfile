FROM node:14-alpine as builder
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build
FROM nginx:alpine as runner
COPY --from=builder /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]