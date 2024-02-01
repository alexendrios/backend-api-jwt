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
                    // Use o Node.js definido no bloco tools
                    def nodejsHome = tool 'node 18.16.0'
                    env.PATH = "${nodejsHome}/bin:${env.PATH}"
                }

                // Verifique a versão do Node.js
                sh 'node -v'

                // Instale dependências do Node.js
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                // Execute testes usando o Node.js e npm do bloco tools
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
                    // Publicar relatórios HTML
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: './',
                        reportFiles: 'test-report.html',
                        reportName: 'Reports app api-jwt',
                        reportTitles: 'The Report'
                    ])

                    step([$class: 'ScoveragePublisher', reportDir: './coverage/', reportFile: 'clover.xml'])

                   
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
