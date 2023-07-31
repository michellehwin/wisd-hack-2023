import boto3
from pathlib import Path


def main():
    """
    Simple script to download wisd sportsradar data to local directory
    """
    s3_client = boto3.client('s3')
    bucket = "sportradar-wisd-data"

    print("Connecting to Sportradar S3 bucket...")
    response = s3_client.list_objects_v2(Bucket=bucket)
    files = response.get("Contents")
    print(f"Success! \nDownloading {len(files)} files... \n")
    for file_num, file in enumerate(files):
        current_file = file['Key']
        download_path = "./" + current_file
        dir_path = current_file.split('/')

        # create games or metadata folder
        if ("games/" in download_path):
            dir_path = f"./{dir_path[0]}/{dir_path[1]}"
        else:
            dir_path = f"./{dir_path[0]}"
        Path(dir_path).mkdir(parents=True, exist_ok=True)
        print(
            f"Downloading file: {download_path} [{file_num + 1}/{len(files)}]"
        )

        # check if file is already downloaded
        download_file = Path(download_path)
        if not download_file.is_file():
            s3_client.download_file(bucket, current_file, download_path)
        print(f"Successfully downloaded {download_path} \n")


if __name__ == "__main__":
    main()
