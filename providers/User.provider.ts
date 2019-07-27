class UserProvider {

    private index: number = 0;

    public logIndex(): void {
        console.log('user provider index :', this.index++);
    }
}

export default UserProvider;
