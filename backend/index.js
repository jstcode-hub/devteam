import { web } from './applications/web.js';
import { logger } from './applications/logging.js';

web.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`);
});
