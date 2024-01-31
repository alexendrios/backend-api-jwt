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
                checkout scm
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
                
                 unit '**/test-report.html'
                publishCobertura coberturaReportFile: '**/coverage/lcov-report/index.html'
            }
        }
    }

    post {
        always {
            cleanWs() 
        }
    }
}
