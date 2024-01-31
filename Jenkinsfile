pipeline {
    agent {
        docker {
            image 'node:14'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building or Resolving Dependencies'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running regression tests'
                sh 'npm test'
            }
            post {
                always {
                    // Publish JUnit test results
                    junit '**/test-report.html'

                    // Publish Cobertura coverage report
                    publishCobertura coberturaReportFile: '**/coverage/lcov-report/index.html'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'WebApp is Ready'
                // Add deploy steps as needed
            }
        }
    }
}
