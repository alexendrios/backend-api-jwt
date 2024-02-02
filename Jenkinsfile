pipeline {
    agent any

    tools {
        nodejs "node 18.16.0"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/alexendrios/backend-api-jwt.git']]])
            }
        }

        stage('Build') {
            steps {
                script {
                    def nodejsHome = tool 'node 18.16.0'
                    env.PATH = "${nodejsHome}/bin:${env.PATH}"
                }

                sh 'node -v'
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                  script {
                    def nodejsHome = tool 'node 18.16.0'
                    env.PATH = "${nodejsHome}/bin:${env.PATH}"
                    sh 'npm test'
                }
            }
        }
        

        stage('Publish test units results') {
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

    post {
        always {
            cleanWs()
        }
    }
}
