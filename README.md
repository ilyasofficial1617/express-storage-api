# express-storage-api
Serves API for file storage. Upload and download API. Support local file storage and 40+ cloud storage mount using rclone.

### How to install & run
If using cloud storage mount, follow [this instruction](https://gist.github.com/ilyasofficial1617/55f0c2b8df7701e0414bb220984b13a3) then continue below
1. Clone express-storage-api
2. Build the image
```
docker build . -t express-storage-api
```
3. Run the image, change 5000 to desired port
```
docker run --rm -p 5000:3000 --name storage-api -d -v audio-storage:/src/storage_folder express-storage-api
```
