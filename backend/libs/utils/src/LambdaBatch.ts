import { logger } from './logger';

export abstract class LambdaBatch {
  private event: any;
  async execute(event: any) {
    const name = this.constructor.name;

    try {
      logger.info({ msg: `${name} を実行` });

      this.event = event;
      await this.doExecute();
    } catch (error) {
      logger.error({ msg: `${name} でエラー発生`, err: error });
      throw error;
    }
  }

  abstract doExecute(): Promise<void>;
}
