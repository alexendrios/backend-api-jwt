pipeline {
    agent 
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
            }
        }
        
        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
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