-- Create Prediction table
CREATE TABLE IF NOT EXISTS public.Prediction (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status TEXT CHECK (status IN ('started', 'completed', 'error')),
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP WITH TIME ZONE,
    predict_time INTERVAL,
    image_url TEXT,
    error TEXT,
    user_id UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.prediction ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to insert their own predictions
CREATE POLICY "Users can insert own predictions" ON public.prediction 
    FOR INSERT TO authenticated 
    WITH CHECK (auth.uid() = user_id);

-- Policy for authenticated users to read their own predictions
CREATE POLICY "Users can read own predictions" ON public.prediction 
    FOR SELECT TO authenticated 
    USING (auth.uid() = user_id);

-- Policy for authenticated users to update their own predictions
CREATE POLICY "Users can update own predictions" ON public.prediction 
    FOR UPDATE TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy for service role to manage all predictions
CREATE POLICY "Service role can manage all predictions" ON public.prediction 
    TO service_role USING (true);

-- Grant permissions
GRANT ALL ON TABLE public.prediction TO authenticated;
GRANT ALL ON TABLE public.prediction TO service_role;
