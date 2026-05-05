from PIL import Image

def remove_bg_flood_fill(image_path, output_path, tolerance=40):
    """Remove background using flood-fill from corners (handles white/black/any bg)."""
    img = Image.open(image_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()

    # Sample background color from top-left corner
    bg_color = pixels[0, 0][:3]

    def color_diff(c1, c2):
        return sum(abs(a - b) for a, b in zip(c1, c2))

    # Flood-fill from all 4 corners using BFS
    from collections import deque
    visited = set()
    queue = deque()
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    for corner in corners:
        queue.append(corner)
        visited.add(corner)

    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        if color_diff((r, g, b), bg_color) <= tolerance:
            pixels[x, y] = (255, 255, 255, 0)  # Make transparent
            for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    queue.append((nx, ny))

    img.save(output_path, "PNG")
    print(f"Saved: {output_path}")

frontend = r"c:\Users\nihar\Music\MERN-Stack-Hospital-Management-System-Web-Application-main\frontend\public\logo.png"
dashboard = r"c:\Users\nihar\Music\MERN-Stack-Hospital-Management-System-Web-Application-main\dashboard\public\logo.png"

remove_bg_flood_fill(frontend, frontend)
remove_bg_flood_fill(dashboard, dashboard)
print("Done!")
