import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.Executors;

public class PumpFunBotUI extends Application {
    private TextArea logArea;
    private TextField tokenAddressField;
    private Spinner<Integer> commentCountSpinner;
    private Button startButton, stopButton, loginCompletedButton, submitDetailsButton;
    private PrintWriter botInput;
    private Process botProcess;

    @Override
    public void start(Stage primaryStage) {
        // Initialize UI elements
        tokenAddressField = new TextField();
        tokenAddressField.setPromptText("Enter token address...");
        tokenAddressField.setDisable(true); // Disabled until login is completed

        commentCountSpinner = new Spinner<>(1, 100, 1);
        commentCountSpinner.setEditable(true);
        commentCountSpinner.setDisable(true); // Disabled until login is completed

        startButton = new Button("Start Bot");
        stopButton = new Button("Stop Bot");
        stopButton.setDisable(true); // Initially disabled

        loginCompletedButton = new Button("Login Completed");
        loginCompletedButton.setDisable(true); // Initially disabled

        submitDetailsButton = new Button("Submit Details");
        submitDetailsButton.setDisable(true); // Disabled until token address and comment count are provided

        logArea = new TextArea();
        logArea.setEditable(false);
        logArea.setStyle("-fx-control-inner-background: #1e1e1e; -fx-text-fill: white;");

        // Layout setup
        HBox inputBox = new HBox(10, new Label("Token Address:"), tokenAddressField, 
                new Label("Comments:"), commentCountSpinner, submitDetailsButton);
        inputBox.setStyle("-fx-padding: 10; -fx-alignment: center;");

        HBox buttonBox = new HBox(10, startButton, loginCompletedButton, stopButton);
        buttonBox.setStyle("-fx-padding: 10; -fx-alignment: center;");

        VBox root = new VBox(10, inputBox, buttonBox, new Label("Log Output:"), logArea);
        root.setStyle("-fx-background-color: #2d2d2d; -fx-padding: 15;");

        Scene scene = new Scene(root, 600, 400);
        primaryStage.setScene(scene);
        primaryStage.setTitle("PumpFun Bot UI");
        primaryStage.show();

        // Button actions
        startButton.setOnAction(event -> startBot());
        loginCompletedButton.setOnAction(event -> confirmLogin());
        submitDetailsButton.setOnAction(event -> submitDetails());
        stopButton.setOnAction(event -> stopBot());
    }

    private void startBot() {
        startButton.setDisable(true);
        loginCompletedButton.setDisable(false);
        stopButton.setDisable(false);

        try {
            // Start the PumpFunBot.js script
            ProcessBuilder builder = new ProcessBuilder("node", "D:\\webProjects\\Bot\\src\\bot\\PumpFunBot.js");
            botProcess = builder.start();

            // Capture bot input and output streams
            botInput = new PrintWriter(new OutputStreamWriter(botProcess.getOutputStream()), true);

            Executors.newSingleThreadExecutor().submit(() -> {
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(botProcess.getInputStream()))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        String logLine = line;
                        javafx.application.Platform.runLater(() -> logArea.appendText(logLine + "\n"));
                    }
                } catch (Exception e) {
                    javafx.application.Platform.runLater(() -> logArea.appendText("Error reading bot output: " + e.getMessage() + "\n"));
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
            logArea.appendText("Error starting bot: " + e.getMessage() + "\n");
            startButton.setDisable(false);
            loginCompletedButton.setDisable(true);
            stopButton.setDisable(true);
        }
    }

    private void confirmLogin() {
        if (botInput != null) {
            // Signal the bot script that login is complete
            botInput.println("login_completed");
            logArea.appendText("Login confirmation sent. Proceeding...\n");

            // Enable input fields for token address and comment count
            tokenAddressField.setDisable(false);
            commentCountSpinner.setDisable(false);
            submitDetailsButton.setDisable(false);

            loginCompletedButton.setDisable(true);
        }
    }

    private void submitDetails() {
        String tokenAddress = tokenAddressField.getText().trim();
        int commentCount = commentCountSpinner.getValue();

        if (tokenAddress.isEmpty()) {
            showAlert("Input Error", "Please enter a valid token address.");
            return;
        }

        if (botInput != null) {
            // Send token address and comment count to the bot script
            botInput.println(tokenAddress);
            botInput.println(commentCount);
            logArea.appendText("Token address and comment count sent to bot.\n");

            // Disable input fields after submission
            tokenAddressField.setDisable(true);
            commentCountSpinner.setDisable(true);
            submitDetailsButton.setDisable(true);
        }
    }

    private void stopBot() {
        if (botProcess != null && botProcess.isAlive()) {
            botInput.println("delete_cookies"); // Send signal to delete cookies
            logArea.appendText("Command sent to delete cookies. Waiting for confirmation...\n");
    
            try {
                // Wait for the process to complete deletion
                botProcess.waitFor(3, java.util.concurrent.TimeUnit.SECONDS); // Adjust the timeout if needed
            } catch (InterruptedException e) {
                logArea.appendText("Error while waiting for bot process to delete cookies: " + e.getMessage() + "\n");
            }
    
            botProcess.destroy(); // Stop the bot process
            logArea.appendText("Bot stopped.\n");
        }
        resetUI();
    }
    
    private void resetUI() {
        startButton.setDisable(false);
        loginCompletedButton.setDisable(true);
        stopButton.setDisable(true);
        tokenAddressField.setDisable(true);
        commentCountSpinner.setDisable(true);
        submitDetailsButton.setDisable(true);
    }
    
    
    private void showAlert(String title, String message) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.setTitle(title);
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
