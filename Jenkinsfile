pipeline {
    agent {
        docker {
            image 'node:14' 
            args '-u root'  
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/alexendrios/backend-api-jwt.git']]])
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run unit tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate coverage report') {
            steps {
                sh 'npm run coverage'
            }
        }

        stage('Start Application') {
            steps {
                sh 'npm start &'
                sleep 10 
            }
        }

        stage('Publish test results and coverage') {
            steps {
                // Publish Unit test results
                 unit '**/test-report.html'

                // Publish Cobertura coverage report
                publishCobertura coberturaReportFile: '**/coverage/lcov-report/index.html'
            }
        }
    }

    post {
        always {
            cleanWs() // Clean up workspace and other post-build tasks if needed
        }
    }
}