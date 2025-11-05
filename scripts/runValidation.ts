import {
  generateReport,
  generateFixScript,
  getQuestionStats,
} from "./validateQuestions";

const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0] || "report";

  console.log("=".repeat(60));
  console.log("📝 Question Validation Tool");
  console.log("=".repeat(60));
  console.log("");

  try {
    switch (command) {
      case "report":
        await generateReport();
        break;
      case "fix":
        await generateFixScript();
        break;
      case "stats":
        await getQuestionStats();
        break;
      case "all":
        console.log("🔍 Running full analysis...\n");
        await getQuestionStats();
        console.log("\n" + "=".repeat(60) + "\n");
        await generateReport();
        break;
      default:
        console.log("Usage: npm run validate [command]");
        console.log("");
        console.log("Commands:");
        console.log(
          "  report  - Generate a detailed report of violations (default)"
        );
        console.log("  fix     - Generate SQL script to fix violations");
        console.log("  stats   - Show question distribution by subject");
        console.log("  all     - Run stats + report");
        console.log("");
        console.log("Examples:");
        console.log("  npm run validate");
        console.log("  npm run validate report");
        console.log("  npm run validate fix > fix-script.sql");
        console.log("  npm run validate stats");
    }
  } catch (error) {
    console.error("❌ Error running validation:", error);
    process.exit(1);
  }
};

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
