export interface JwtResponse {
    userData: {
        nombreUsuario: string,
        accessToken: string,
        expiresIn: string
    }
}
