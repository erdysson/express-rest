class AuthProvider {
    private index: number = 0;

    public logIndex(): void {
        console.log('auth provider index :', this.index++);
    }
}

export default AuthProvider;
