import { app } from "./server";
import { config } from "./shared/config/config";
import { logger } from "./shared/utils/logger";

const PORT = config.port;

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
