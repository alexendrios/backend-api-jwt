pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'node:14'
    }

    stages {
        stage('Setup Docker') {
            steps {
                script {
                    sh 'which docker || (curl -fsSL https://get.docker.com/ | sh)'
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
                    // Verifique se a imagem Docker está disponível
                    sh "docker inspect -f . ${DOCKER_IMAGE} || docker pull ${DOCKER_IMAGE}"
                    sh "docker build -t Packer ."
                }
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    sh "docker run --rm -v $PWD:/app -w /app ${DOCKER_IMAGE} npm install"
                }
            }
        }

        stage('Run unit tests') {
            steps {
                script {
                    sh "docker run --rm -v $PWD:/app -w /app ${DOCKER_IMAGE} npm test"
                }
            }
        }

        stage('Start Application') {
            steps {
                script {
                    // Inicie a aplicação na imagem do Docker
                    sh "docker run --rm -d -v $PWD:/app -w /app -p 3000:3000 ${DOCKER_IMAGE} npm start"
                    sleep 10
                }
            }
        }

        stage('Publish test results and coverage') {
            steps {
                script {
                    junit '**/test-report.html'
                    publishCobertura coberturaReportFile: '**/coverage/lcov-report/index.html'
                }
            }
        }
    }

    post {
        always {
            // Limpeza ou ações pós-build
            cleanWs()
        }
    }
}
