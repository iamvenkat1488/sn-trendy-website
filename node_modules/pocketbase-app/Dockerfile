FROM alpine:latest

# Install dependencies
RUN apk add --no-cache \
    ca-certificates \
    unzip \
    wget

# Download PocketBase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.25.0/pocketbase_0.25.0_linux_amd64.zip \
    && unzip pocketbase_0.25.0_linux_amd64.zip \
    && rm pocketbase_0.25.0_linux_amd64.zip \
    && chmod +x pocketbase

# Copy migrations and hooks
COPY pb_migrations /pb_migrations
COPY pb_hooks /pb_hooks

# Expose port
EXPOSE 10000

# Start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:10000"]
