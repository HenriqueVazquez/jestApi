import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Cliente } from './schema/clientes.schema';
import { Model } from 'mongoose';

describe('ClientesService', () => {
  let service: ClientesService;
  let model: Model<Cliente>;

  const mockCliente = { _id: '1', name: 'Henrique', email: 'test@test.com' };

  const mockClienteModel = {
    new: jest.fn().mockResolvedValue(mockCliente),
    constructor: jest.fn().mockResolvedValue(mockCliente),
    create: jest.fn().mockResolvedValue(mockCliente),
    find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockCliente]) }),
    findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockCliente) }),
    findByIdAndUpdate: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue({ ...mockCliente, name: 'Atualizado' }) }),
    findByIdAndDelete: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockCliente) }),
    save: jest.fn().mockResolvedValue(mockCliente),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getModelToken(Cliente.name),
          useValue: mockClienteModel,
        },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    model = module.get<Model<Cliente>>(getModelToken(Cliente.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cliente', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockCliente as any);
    const result = await service.create(mockCliente);
    expect(result).toEqual(mockCliente);
    expect(model.create).toHaveBeenCalledWith(mockCliente);
  });

  it('should return all clientes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCliente]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return one cliente by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(mockCliente);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('should update a cliente', async () => {
    const result = await service.update('1', { name: 'Atualizado' });
    expect(result).toEqual({ ...mockCliente, name: 'Atualizado' });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', { name: 'Atualizado' }, { new: true });
  });

  it('should delete a cliente', async () => {
    const result = await service.remove('1');
    expect(result).toEqual(mockCliente);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
