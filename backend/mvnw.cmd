@echo off
setlocal
set "MAVEN_PROJECTBASEDIR=%~dp0"
:: Remove trailing backslash if present to avoid quote escaping issues
if "%MAVEN_PROJECTBASEDIR:~-1%"=="\" set "MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%"

set "MAVEN_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"

if not exist "%MAVEN_JAR%" (
    echo Error: Could not find maven-wrapper.jar at "%MAVEN_JAR%"
    exit /b 1
)

java -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" -cp "%MAVEN_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*
endlocal
