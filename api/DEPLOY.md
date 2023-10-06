# Deploying the APP

Run the following command locally to build the image:

```bash
export TAG=v1.1.0
docker build -t muriloflemos/tv-araguari:$TAG . --platform=linux/amd64
```

Testing the docker build

```bash
docker run -p 3000:3000 muriloflemos/tv-araguari:$TAG
```

Publish to docker hub

```bash
docker push muriloflemos/tv-araguari:$TAG
```

Pull image

```bash
docker pull muriloflemos/tv-araguari:$TAG
```

Run image

```bash
docker run -d -p 80:3000 muriloflemos/tv-araguari:$TAG
```
