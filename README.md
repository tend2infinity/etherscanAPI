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
3. Install docker according to you operating system. This will help in running a prometheus container to scrap metrics from our node server
4. Create you own Keys.js in the root folder, specifying the APIKEY for etherscan and MONGOURI like so,
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
3.  Start the prometheus server using prometheus image available on dockerhub with the configuration as mentioned.
      ```
      docker run --rm -p 9090:9090 \
     -v `pwd`/prometheus.yml:/etc/prometheus/prometheus.yml \
     prom/prometheus:v2.20.1
      ```
4.  Prometheus will be accessible on `http://localhost:9090`
5.  Make any request to `/getNormalTransactionsAPIResponse` and you can see the metric `http_request_duration_seconds` getting populated in the prometheus UI.  
