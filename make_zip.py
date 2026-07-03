import os
import zipfile

def create_zip():
    zip_name = "pathumrat-tech-college-website.zip"
    exclusions = {
        "node_modules", "dist", ".git", ".env", "package-lock.json",
        ".env.example", ".gitignore", "pathumrat-tech-college-website.tar.gz"
    }
    
    print(f"Creating {zip_name}...")
    
    with zipfile.ZipFile(zip_name, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk("."):
            # Skip directories in exclusions
            dirs[:] = [d for d in dirs if d not in exclusions and not d.startswith(".")]
            
            for file in files:
                # Skip excluded files or zip itself
                if file in exclusions or file == zip_name or file.startswith("."):
                    continue
                
                file_path = os.path.join(root, file)
                # Keep archive path relative
                archive_path = os.path.relpath(file_path, ".")
                print(f"Adding: {archive_path}")
                zipf.write(file_path, archive_path)
                
    print(f"\n🎉 ZIP file created successfully at:\n   {os.path.abspath(zip_name)}\n")

if __name__ == "__main__":
    create_zip()
