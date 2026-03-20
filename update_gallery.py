import os
import json

# Configuration
GALLERY_DIR = r'assets/gallery'
OUTPUT_FILE = r'gallery-data.js'
EXTENSIONS = ('.jpg', '.jpeg', '.png', '.mov', '.gif', '.webp')

def main():
    base_dir = os.getcwd()
    abs_gallery_dir = os.path.join(base_dir, GALLERY_DIR)
    
    if not os.path.exists(abs_gallery_dir):
        print(f"Error: Directory not found: {abs_gallery_dir}")
        return

    gallery_data = {
        'all': []
    }

    count = 0
    for root, dirs, files in os.walk(abs_gallery_dir):
        files.sort()
        for filename in files:
            if filename.lower().endswith(EXTENSIONS):
                # Determine filter category
                rel_dir = os.path.relpath(root, abs_gallery_dir)
                category = 'all' if rel_dir == '.' else rel_dir.replace('\\', '/').split('/')[-1].lower()
                
                # Src should be relative to base_dir
                rel_path = os.path.relpath(os.path.join(root, filename), base_dir).replace('\\', '/')
                
                item = {
                    'src': rel_path,
                    'year': category,  # Used as the filter key
                    'title': 'Gallery Photo',
                    'description': 'Moment captured',
                    'category': category
                }
                gallery_data['all'].append(item)
                count += 1

    print(f"Found {count} images in {GALLERY_DIR}")

    json_str = json.dumps(gallery_data, indent=4)
    js_content = f"// Auto-generated gallery data\n// Run update_gallery.bat to update this file after adding images\n\nconst galleryData = {json_str};\n"

    output_path = os.path.join(base_dir, OUTPUT_FILE)
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"Successfully created {OUTPUT_FILE}")
    except Exception as e:
        print(f"Error writing file: {e}")

if __name__ == "__main__":
    main()
