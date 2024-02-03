pipeline {
    agent any

    tools {
        nodejs "node" 
    }

    stages {
        stage('Pull Docker Image') {
            steps {
                script {
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
                    // Node.js já está disponível no PATH devido à configuração da ferramenta
                    sh 'node -v'
                    sh 'npm install'
                }
            }
        }

        stage('Run Unit Tests and Generate Code Coverage') {
            steps {
                script {
                    sh 'npm test'
                    sh 'mv coverage/lcov-report/index.html coverage/lcov-report/test-report.html'
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
                        reportDir: './',
                        reportFiles: 'test-report.html',
                        reportName: 'Reports app api-jwt',
                        reportTitles: 'The Report'
                    ])
                }
            }
        }
    }
}