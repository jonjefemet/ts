export default interface UseCase<T, U> {
    export(port?: T): Promise<U>
}