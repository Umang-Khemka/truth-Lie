import {create} from "zustand";
import gameInstance from "../api/gameInstance.js";

export const useGameStore = create((set)=> ({
    games:[],
    currentGame: null,
    leaderboard: [],
    loading: false,
    error: null,

    fetchGames: async()=> {
        set({loading: true, error: null});
        try{
            const res  = await gameInstance.get("/");
            set({games: res.data, loading: false});
        } catch(err){
            set({error: err.response?.data?.message || "Failed to fetch games", loading: false});
        }
    },

    createGame: async(gameData)=> {
        set({loading: true, error: null});
        try{
            const res = await gameInstance.post("/", gameData);
            set((state)=> ({
                games: [...state.games, res.data],
                loading: false,
            }));
            return res.data;
        }catch(err){
            set({ error: err.response?.data?.message || "Failed to create game", loading: false });
        }
    },

    fetchGameById: async(id)=> {
        set({loading: true, error: null});
        try{
            const res = await gameInstance.get(`/${id}`);
            set({currentGame: res.data, loading: false});
            return res.data;
        } catch(err){
            set({ error: err.response?.data?.message || "Failed to fetch game", loading: false });
        }
    },

    guessGame: async(id, guessData)=> {
        set({loading: true, error: null});
        try{
            const res = await gameInstance.post(`/${id}/guess`,guessData);
            set({currentGame: res.data, loading: false});
            return res.data;
        }catch(err){
            set({ error: err.response?.data?.message || "Failed to guess", loading: false });
        }
    },


    fetchLeaderboard: async () => {
    set({ loading: true, error: null });
    try {
      const res = await gameInstance.get("/leaderboard/all");
      set({ leaderboard: res.data, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch leaderboard", loading: false });
    }
  },
}));