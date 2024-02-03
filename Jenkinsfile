pipeline {
    agent any

    stages {
        stage('Pull Docker Image') {
            steps {
                script {
                    // Use a imagem oficial do Node.js
                    docker.image("node").pull()
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/alexendrios/backend-api-jwt.git']]])
            }
        }

        stage('Build') {
            steps {
                script {
                    // Use o Docker para executar os comandos node e npm
                    docker.image("node").inside {
                        sh 'node -v'
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Run Unit Tests and Generate Code Coverage') {
            steps {
                script {
                    docker.image("node").inside {
                        sh 'npm test'
                        sh 'mv coverage/lcov-report/index.html coverage/lcov-report/test-report.html'
                    }
                }
            }
        }

            stage('Publish Test Reports') {
                steps {
                    script {
                        publishHTML(target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: './', // ou 'test-results'
                            reportFiles: 'test-report.html',
                            reportName: 'Reports app api-jwt',
                            reportTitles: 'The Report'
                        ])
                        junit checksName: 'report', stdioRetention: true, testResults: './reports/*.xml'
                    }
                }
       }
    }
}