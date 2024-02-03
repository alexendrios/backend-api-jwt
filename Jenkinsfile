pipeline {
    agent any

    stages {
        stage('Pull Docker Image') {
            steps {
                script {
                    docker.image('node').pull()
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
                    def nodejsHome = tool 'node'
                    env.PATH = "${nodejsHome}/bin:${env.PATH}"


                    dir("/var/jenkins_home/workspace/test") {
                        sh 'node -v'
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Run Unit Tests and Generate Code Coverage') {
            steps {
                script {
                    def customImage = docker.image('node')
                    customImage.inside {
                        sh 'cd /var/jenkins_home/workspace/test'

                        def nodejsHome = tool 'node'
                        env.PATH = "${nodejsHome}/bin:${env.PATH}"
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
