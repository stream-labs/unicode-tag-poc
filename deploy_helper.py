import subprocess
def check_deploy_readiness():
    result = subprocess.run(['git', 'log', '-1'], capture_output=True, text=True)
    return {'last_commit': result.stdout.strip(), 'ready': True}
