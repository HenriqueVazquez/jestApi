import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente } from './schema/clientes.schema';

@Injectable()
export class ClientesService {
  constructor(@InjectModel(Cliente.name) private clienteModel: Model<Cliente>) { }

  create(cliente: Partial<Cliente>) {
    return this.clienteModel.create(cliente);
  }
  findAll() {
    return this.clienteModel.find().exec();
  }

  findOne(id: string) {
    return this.clienteModel.findById(id).exec();
  }

  update(id: string, cliente: Partial<Cliente>) {
    return this.clienteModel.findByIdAndUpdate(id, cliente, { new: true }).exec();
  }

  remove(id: string) {
    return this.clienteModel.findByIdAndDelete(id).exec();
  }
}
