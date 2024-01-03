import { app } from "./app";
import { PORT } from "./configs";
import swaggerDocs from "./swagger/swagger";

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  swaggerDocs(app);
});