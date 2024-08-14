# Для запуска Docker'a

1. next.config - раскомитить standalone
2. .env - раскомитить путь для db - из докера стучаться по имени сервиса в докере
3. schema.prisma раскомидить бинарную загрузку для линукс систем
4. создать папку dev куда переместить все из папки docker, создать папку front - для проекта или поменять пути в docker-compose.yml
5. после запуска db запустить npx prisma db push для создания клиета призмы, в докере прописал но может не сработать, для этого путь к db должен быть через localhost
6. установить npm i sharp
7. программа для просмотра db - tableplus


https://github.com/vercel/next.js/blob/canary/examples/with-docker-compose/README.md


## Development
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build dev
docker compose -f docker-compose.dev.yml build

# Up dev
docker compose -f docker-compose.dev.yml up


## Production
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create my_network

# Build prod
docker compose -f docker-compose.prod.yml build

# Up prod in detached mode
docker compose -f docker-compose.prod.yml up -d



# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes