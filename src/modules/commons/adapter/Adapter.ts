export default interface Adapter<T, U> {
    execute(port?: T): Promise<U>;
}