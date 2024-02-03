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
                        sh 'mv coverage/lcov-report/*.html'
                        sh 'mv coverage/*.json'
                    }
                }
            }
        }

        stage('Publish Test Reports') {
            steps {
                script {
                    // Publique os relatórios JUnit e HTML
                    
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: '/',
                        reportFiles: '*.html',
                        reportName: 'Reports app api-jwt',
                        reportTitles: 'The Report'
                    ])
                    junit checksName: 'Test de Cobertura', testResults: 'coverage/*.xml'
                }
          }
       }
    }
}