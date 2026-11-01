export abstract class User {
    constructor(
        public readonly id: string,
        protected name: string,
        protected email: string,
        private password: string,
        protected role: string
    ) {}

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getRole(): string {
        return this.role;
    }

    public abstract getPermissions(): string[];

    public verifyPassword(password: string): boolean {
        return this.password === password;
    }
}