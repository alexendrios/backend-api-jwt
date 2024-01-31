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
                sh "node -v"
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Run Unit Tests') {
            steps {
                sh 'npm run test'
            }
        }
    }
}