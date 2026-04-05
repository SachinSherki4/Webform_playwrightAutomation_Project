pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['local', 'dev', 'staging', 'production'], description: 'Select environment')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Select browser')
        booleanParam(name: 'HEADED', defaultValue: false, description: 'Run in headed mode')
    }

    environment {
        WORKSPACE = "${WORKSPACE}"
        ENVIRONMENT = "${params.ENVIRONMENT}"
        BROWSER = "${params.BROWSER}"
        HEADLESS = !${params.HEADED}
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo "Setting up environment..."
                script {
                    if (isUnix()) {
                        sh 'node --version'
                        sh 'npm --version'
                    } else {
                        bat 'node --version'
                        bat 'npm --version'
                    }
                }
                echo "Installing dependencies..."
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                        sh 'npx playwright install --with-deps'
                    } else {
                        bat 'npm ci'
                        bat 'npx playwright install --with-deps'
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                echo "Running linter..."
                script {
                    if (isUnix()) {
                        sh 'npm run lint || true'
                    } else {
                        bat 'npm run lint || true'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running tests on ${params.ENVIRONMENT}..."
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Report') {
            when {
                always()
            }
            steps {
                echo "Archiving test results..."
                archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
                
                echo "Publishing test report..."
                script {
                    if (fileExists('reports/html/index.html')) {
                        publishHTML([
                            reportDir: 'reports/html',
                            reportFiles: 'index.html',
                            reportName: 'Playwright Test Report'
                        ])
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Test execution completed"
            cleanWs()
        }
        success {
            echo "All tests passed!"
        }
        failure {
            echo "Tests failed!"
            script {
                if (isUnix()) {
                    sh 'ls -la reports/'
                } else {
                    bat 'dir reports\\'
                }
            }
        }
    }
}
