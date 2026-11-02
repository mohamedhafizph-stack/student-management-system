export interface IRepository<T, CreateInput, UpdateInput> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateInput): Promise<T>;
  update(id: string, data: UpdateInput): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}