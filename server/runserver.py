import uvicorn



if __name__ == "__main__":
    uvicorn.run("src:app",
                port =4000,
                reload=True
                )