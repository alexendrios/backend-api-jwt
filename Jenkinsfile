pipeline {
    agent {
        docker {
            image 'node:14' // Use a Node.js image or any other image you need
            args '-u root' // Optional: Run as root if additional dependencies need installation
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

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        // Add more stages as needed

        stage('Cleanup') {
            steps {
                sh 'npm clean' // Optional: Add cleanup steps if needed
            }
        }
    }

    post {
        always {
            // Optional: Add cleanup steps that should always run
        }
    }
}
