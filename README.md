# Etherscan API monitoring
Nodejs API to fetch crypto transactions of a user and scrap metrics from the server using Prometheus

***
### Tech Stack and Concepts used:

* __Backend:__ Nodejs, Expressjs,
* __Database:__ MongoDB
* __Containerization:__ Docker
* __Monitoring:__ Prometheus
* __Tools:__ Git
***

## Setting up the project
### Backend

1. Clone the repo

   ```sh
   git clone https://github.com/tend2infinity/etherscanAPI
   ```
2. Install NPM packages

   ```sh
   npm install
   ```
3. Install `docker` according to you operating system. This will help in running a prometheus container to scrap metrics from our node server
4. Create you own `Keys.js` in the root folder, specifying the APIKEY for etherscan and MONGOURI like so,
   ```
   module.exports = {
       MONGOURI: '****',
       APIKEY: '****'
     }
   ```
5. Configure `prometheus.yml` according to your needs. Example config given below
    ```
      global:
        scrape_interval: 5s 
      scrape_configs:
        - job_name: "node-application-monitoring-app"
          static_configs:
            - targets: ["192.168.49.1:5000"] #this target should be the host ip address of you local system or the docker container where you're running your application
    ```
 6. To find host IP address of your system 
      ```
      ifconfig | grep 'inet 192'| awk '{ print $2}'
      ```

### Usage

1.  Start the server using nodemon in dev mode

    ```sh 
    nodemon app.js
    ```
    This will start your node application on port `5000` of your local machine.
2.  You can even check if your node application is getting scraped correctly using `curl -GET localhost:5000/metrics`
    ```
          # HELP http_request_duration_seconds Duration of HTTP requests in seconds
      # TYPE http_request_duration_seconds histogram
      http_request_duration_seconds_bucket{le="0.1",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="0.3",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="0.5",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="0.7",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="1",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="3",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="5",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="7",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="10",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="+Inf",route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_sum{route="/metrics",code="200",method="GET"} 0.7217860379999997
      http_request_duration_seconds_count{route="/metrics",code="200",method="GET"} 102
      http_request_duration_seconds_bucket{le="0.1",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 0
      http_request_duration_seconds_bucket{le="0.3",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 0
      http_request_duration_seconds_bucket{le="0.5",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 0
      http_request_duration_seconds_bucket{le="0.7",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 0
      http_request_duration_seconds_bucket{le="1",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 0
      http_request_duration_seconds_bucket{le="3",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 2
      http_request_duration_seconds_bucket{le="5",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 4
      http_request_duration_seconds_bucket{le="7",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 4
      http_request_duration_seconds_bucket{le="10",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 4
      http_request_duration_seconds_bucket{le="+Inf",route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 4
      http_request_duration_seconds_sum{route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 13.106360552
      http_request_duration_seconds_count{route="/getNormalTransactionsAPIResponse",code="200",method="POST"} 4

    ```

3.  Start the prometheus server using prometheus image available on dockerhub with the configuration as mentioned.
      ```
      docker run --rm -p 9090:9090 \
     -v `pwd`/prometheus.yml:/etc/prometheus/prometheus.yml \
     prom/prometheus:v2.20.1
      ```
4.  Prometheus will be accessible on `http://localhost:9090`
5.  Make any request to `/getNormalTransactionsAPIResponse` and you can see the metric `http_request_duration_seconds` getting populated in the prometheus UI.  

![Screenshot from 2023-02-25 13-15-53](https://user-images.githubusercontent.com/61948033/221345677-029dab10-02b3-4032-ba95-67727a52b5c3.png)

![Screenshot from 2023-02-25 13-18-34](https://user-images.githubusercontent.com/61948033/221345695-30320e73-913b-4bcb-944d-2c17c047c0c9.png)

![Screenshot from 2023-02-25 13-19-31](https://user-images.githubusercontent.com/61948033/221345703-9e058342-19f2-4788-aee8-c17082d40c15.png)

![Screenshot from 2023-02-25 13-19-47](https://user-images.githubusercontent.com/61948033/221345709-10d5cb33-abb2-4021-b50b-8f891f494dde.png)
